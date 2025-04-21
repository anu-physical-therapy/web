#!/bin/bash

# Script to convert all PNG and JPG files in the images directory to WebP format
# Usage: ./convert-to-webp.sh [quality]
# Quality is optional (default 85)

# Set the quality level (0-100)
QUALITY=${1:-85}

# Check if webp tools are installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp not found. Please install WebP tools:"
    echo "  For Ubuntu/Debian: sudo apt-get install webp"
    echo "  For macOS: brew install webp"
    exit 1
fi

# Directory containing images
IMAGE_DIR="images"

if [ ! -d "$IMAGE_DIR" ]; then
    echo "Error: '$IMAGE_DIR' directory not found!"
    exit 1
fi

# Create a log file
LOG_FILE="webp-conversion-$(date +%Y%m%d-%H%M%S).log"
echo "Starting WebP conversion at $(date)" > "$LOG_FILE"
echo "Quality setting: $QUALITY" >> "$LOG_FILE"
echo "----------------------------------------" >> "$LOG_FILE"

# Function to convert a file to WebP
convert_to_webp() {
    local input_file="$1"
    local base_name=$(basename "$input_file")
    local dir_name=$(dirname "$input_file")
    local file_name="${base_name%.*}"
    local output_file="$dir_name/$file_name.webp"
    
    # Skip if WebP version already exists and is newer
    if [ -f "$output_file" ] && [ "$output_file" -nt "$input_file" ]; then
        echo "Skipping $input_file (WebP version exists and is newer)" | tee -a "$LOG_FILE"
        return
    fi

    echo "Converting $input_file to WebP..." | tee -a "$LOG_FILE"
    
    # Get original file size for comparison
    local original_size=$(stat -c %s "$input_file" 2>/dev/null || stat -f %z "$input_file")
    
    # Perform the conversion
    cwebp -q "$QUALITY" "$input_file" -o "$output_file" 2>&1 | tee -a "$LOG_FILE"
    
    # If conversion successful, get new file size and calculate savings
    if [ -f "$output_file" ]; then
        local webp_size=$(stat -c %s "$output_file" 2>/dev/null || stat -f %z "$output_file")
        local saved_bytes=$((original_size - webp_size))
        local saved_percent=$(awk "BEGIN { printf \"%.1f\", ($saved_bytes / $original_size) * 100 }")
        
        echo "  Original: $original_size bytes" | tee -a "$LOG_FILE"
        echo "  WebP: $webp_size bytes" | tee -a "$LOG_FILE" 
        echo "  Saved: $saved_bytes bytes ($saved_percent%)" | tee -a "$LOG_FILE"
    else
        echo "  Error: Conversion failed!" | tee -a "$LOG_FILE"
    fi
    
    echo "" >> "$LOG_FILE"
}

# Find all PNG and JPG files in the images directory and convert them
echo "Scanning $IMAGE_DIR for PNG and JPG files..."
echo ""

# Counter for converted files
TOTAL_FILES=0
TOTAL_CONVERTED=0

# Process PNG files
for file in $(find "$IMAGE_DIR" -type f -name "*.png"); do
    TOTAL_FILES=$((TOTAL_FILES + 1))
    convert_to_webp "$file"
    TOTAL_CONVERTED=$((TOTAL_CONVERTED + 1))
done

# Process JPG/JPEG files
for file in $(find "$IMAGE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" \)); do
    TOTAL_FILES=$((TOTAL_FILES + 1))
    convert_to_webp "$file"
    TOTAL_CONVERTED=$((TOTAL_CONVERTED + 1))
done

echo "----------------------------------------" >> "$LOG_FILE"
echo "Conversion complete!" | tee -a "$LOG_FILE"
echo "Processed $TOTAL_FILES files, converted $TOTAL_CONVERTED to WebP" | tee -a "$LOG_FILE"
echo "See $LOG_FILE for details"

# Remind user about updating HTML
echo ""
echo "IMPORTANT: Remember to update your HTML files to reference the new WebP images."
echo "For example, change:"
echo "  <img src=\"images/example.jpg\">"
echo "To:"
echo "  <img src=\"images/example.webp\">"