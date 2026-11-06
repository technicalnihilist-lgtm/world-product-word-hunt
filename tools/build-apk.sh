#!/usr/bin/env bash
# Build a signed debug APK without Gradle.
# Needs: JDK 17+ (javac/keytool), Android build-tools (aapt2, d8, zipalign, apksigner),
#        an android.jar (platform 34).
#
#   ANDROID_JAR=/path/android.jar  BUILD_TOOLS=/path/build-tools/android-14  ./tools/build-apk.sh
#
# On CI the workflow .github/workflows/android-apk.yml provisions these automatically.
set -euo pipefail
# keep the JVM small: CI runners and phones are modest, and the build is tiny
export JAVA_TOOL_OPTIONS="${JAVA_TOOL_OPTIONS_OVERRIDE:--Xmx300m -Xms64m -XX:MaxMetaspaceSize=140m -XX:CompressedClassSpaceSize=64m -XX:ReservedCodeCacheSize=48m -XX:ActiveProcessorCount=1 -XX:+UseSerialGC}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_TOOLS="${BUILD_TOOLS:?set BUILD_TOOLS to the build-tools directory}"
ANDROID_JAR="${ANDROID_JAR:?set ANDROID_JAR to platform android.jar}"
OUT="$ROOT/dist"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "== 1/7 stage assets"
mkdir -p "$WORK/assets/assets/icons"
cp "$ROOT/index.html" "$ROOT/manifest.webmanifest" "$ROOT/catalog.json" "$WORK/assets/"
mkdir -p "$WORK/assets/assets/img"
cp "$ROOT"/assets/img/*.jpg "$WORK/assets/assets/img/" 2>/dev/null || true
cp "$ROOT"/assets/icons/*.png "$WORK/assets/assets/icons/"

echo "== 2/7 compile resources"
mkdir -p "$WORK/res/mipmap-hdpi" "$WORK/res/mipmap-xhdpi" "$WORK/res/mipmap-xxhdpi" "$WORK/res/mipmap-xxxhdpi"
cp "$ROOT/android/res/values/strings.xml" "$WORK/res/values_strings.xml" 2>/dev/null || true
mkdir -p "$WORK/res/values" && cp "$ROOT/android/res/values/strings.xml" "$WORK/res/values/"
cp "$ROOT/assets/icons/icon-192.png" "$WORK/res/mipmap-xxxhdpi/ic_launcher.png"
cp "$ROOT/assets/icons/icon-192.png" "$WORK/res/mipmap-xxhdpi/ic_launcher.png"
cp "$ROOT/assets/icons/icon-192.png" "$WORK/res/mipmap-xhdpi/ic_launcher.png"
cp "$ROOT/assets/icons/icon-192.png" "$WORK/res/mipmap-hdpi/ic_launcher.png"
"$BUILD_TOOLS/aapt2" compile --dir "$WORK/res" -o "$WORK/res.zip"

echo "== 3/7 link resources + assets"
"$BUILD_TOOLS/aapt2" link \
  -o "$WORK/base.apk" \
  -I "$ANDROID_JAR" \
  --manifest "$ROOT/android/AndroidManifest.xml" \
  -R "$WORK/res.zip" \
  --java "$WORK/gen" \
  -A "$WORK/assets" \
  --min-sdk-version 24 --target-sdk-version 34 \
  --version-code 1 --version-name "$(node -p "require('$ROOT/package.json').version")" \
  --auto-add-overlay

echo "== 4/7 compile java"
mkdir -p "$WORK/classes"
find "$ROOT/android/src" "$WORK/gen" -name '*.java' > "$WORK/sources.txt"
javac -source 8 -target 8 -encoding UTF-8 -bootclasspath "$ANDROID_JAR" -classpath "$ANDROID_JAR" \
  -d "$WORK/classes" @"$WORK/sources.txt" 2>&1 | grep -v 'bootstrap class path' || true

echo "== 5/7 dex"
mkdir -p "$WORK/dex"
"$BUILD_TOOLS/d8" -JXmx300m -JXX:CompressedClassSpaceSize=64m -JXX:MaxMetaspaceSize=140m -JXX:ActiveProcessorCount=1 -JXX:+UseSerialGC --lib "$ANDROID_JAR" --min-api 24 --output "$WORK/dex" $(find "$WORK/classes" -name '*.class')

echo "== 6/7 package"
cp "$WORK/base.apk" "$WORK/unsigned.apk"
(cd "$WORK/dex" && zip -q "$WORK/unsigned.apk" classes.dex)
mkdir -p "$OUT"
"$BUILD_TOOLS/zipalign" -f -p 4 "$WORK/unsigned.apk" "$WORK/aligned.apk"

echo "== 7/7 sign"
KS="$WORK/debug.keystore"
keytool -genkeypair -keystore "$KS" -storepass android -keypass android -alias androiddebugkey \
  -dname "CN=World Product Word Hunt, O=Offline Games, C=IN" -keyalg RSA -keysize 2048 -validity 10000 >/dev/null 2>&1
"$BUILD_TOOLS/apksigner" sign --ks "$KS" --ks-pass pass:android --key-pass pass:android \
  --ks-key-alias androiddebugkey --out "$OUT/world-product-word-hunt.apk" "$WORK/aligned.apk"
"$BUILD_TOOLS/apksigner" verify --print-certs "$OUT/world-product-word-hunt.apk" | head -3
ls -la "$OUT/world-product-word-hunt.apk"
echo "APK ready: $OUT/world-product-word-hunt.apk"
