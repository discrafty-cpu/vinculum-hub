#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# VINCULUM Hub Validation Script
#
# Purpose: Validate all tools before pushing to production
# Usage: ./vinculum-validate.sh [--strict]
#
# Checks:
#   - Required script imports (vinculum-input.js, vinculum-feedback.js)
#   - Required stylesheet (vinculum-core.css)
#   - vinculum-header component present
#   - feedback div present
#   - No legacy .header class usage
#   - File size limits (warn if > 35KB)
#   - Tool counts per grade
# ═══════════════════════════════════════════════════════════════════

set -e

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RESET='\033[0m'
CHECKMARK='✓'
CROSS='✗'
WARNING='⚠'

# Configuration
TOOLS_DIR="tools"
STRICT_MODE=false

# Parse arguments
if [[ "$1" == "--strict" ]]; then
    STRICT_MODE=true
fi

# Initialize counters and results
declare -A grade_counts
declare -a files_to_check
declare -a validation_results
declare -a warnings
declare -a errors

total_tools=0
pass_core_css=0
pass_input_js=0
pass_feedback_js=0
pass_header=0
pass_feedback_div=0
pass_no_legacy_header=0
oversized_files=()

# ═══════════════════════════════════════════════════════════════════
# Helper Functions
# ═══════════════════════════════════════════════════════════════════

print_header() {
    echo -e "${BLUE}═══════════════════════════════════════════════════════${RESET}"
    echo -e "${BLUE}VINCULUM Hub Validation${RESET}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${RESET}"
    echo
}

print_section() {
    echo -e "${BLUE}$1${RESET}"
}

print_success() {
    echo -e "${GREEN}${CHECKMARK} $1${RESET}"
}

print_error() {
    echo -e "${RED}${CROSS} $1${RESET}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${RESET}"
}

check_file_contains() {
    local file=$1
    local pattern=$2
    grep -q "$pattern" "$file" 2>/dev/null
    return $?
}

human_readable_size() {
    local bytes=$1
    if (( bytes > 1024 )); then
        echo "$((bytes / 1024))KB"
    else
        echo "${bytes}B"
    fi
}

# ═══════════════════════════════════════════════════════════════════
# Validation Checks
# ═══════════════════════════════════════════════════════════════════

validate_tool() {
    local file=$1
    local grade=$(basename $(dirname "$file"))
    local tool_name=$(basename "$file")

    # Track grade counts
    if [[ -z "${grade_counts[$grade]}" ]]; then
        grade_counts[$grade]=0
    fi
    grade_counts[$grade]=$((${grade_counts[$grade]} + 1))
    total_tools=$((total_tools + 1))

    # Check vinculum-core.css
    if check_file_contains "$file" "vinculum-core.css"; then
        pass_core_css=$((pass_core_css + 1))
    else
        errors+=("$file: Missing vinculum-core.css")
    fi

    # Check vinculum-input.js
    if check_file_contains "$file" "vinculum-input.js"; then
        pass_input_js=$((pass_input_js + 1))
    else
        errors+=("$file: Missing vinculum-input.js")
    fi

    # Check vinculum-feedback.js
    if check_file_contains "$file" "vinculum-feedback.js"; then
        pass_feedback_js=$((pass_feedback_js + 1))
    else
        errors+=("$file: Missing vinculum-feedback.js")
    fi

    # Check vinculum-header component
    if check_file_contains "$file" "vinculum-header"; then
        pass_header=$((pass_header + 1))
    else
        errors+=("$file: Missing <vinculum-header> component")
    fi

    # Check feedback div
    if check_file_contains "$file" 'id="feedback"'; then
        pass_feedback_div=$((pass_feedback_div + 1))
    else
        errors+=("$file: Missing feedback div (id=\"feedback\")")
    fi

    # Check for legacy .header class
    if ! check_file_contains "$file" 'class="header"'; then
        pass_no_legacy_header=$((pass_no_legacy_header + 1))
    else
        errors+=("$file: Uses legacy .header class (use vinculum-header instead)")
    fi

    # Check file size
    local file_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    if (( file_size > 35840 )); then  # 35KB in bytes
        oversized_files+=("$file ($(human_readable_size $file_size))")
    fi
}

# ═══════════════════════════════════════════════════════════════════
# Main Validation Flow
# ═══════════════════════════════════════════════════════════════════

print_header

# Check if tools directory exists
if [[ ! -d "$TOOLS_DIR" ]]; then
    print_error "Tools directory not found: $TOOLS_DIR"
    exit 1
fi

# Find all HTML files in tools directory
while IFS= read -r file; do
    validate_tool "$file"
done < <(find "$TOOLS_DIR" -name "*.html" -type f | sort)

# ═══════════════════════════════════════════════════════════════════
# Display Results
# ═══════════════════════════════════════════════════════════════════

echo "Tools by Grade:"
for grade in $(printf '%s\n' "${!grade_counts[@]}" | sort); do
    count=${grade_counts[$grade]}
    if [[ $count -gt 0 ]]; then
        print_success "Grade $grade: $count tools"
    fi
done

echo
echo "Total: ${GREEN}${total_tools} tools${RESET}"
echo

# ═══════════════════════════════════════════════════════════════════
# Validation Summary Table
# ═══════════════════════════════════════════════════════════════════

print_section "Validation Checks:"
echo

# Helper function to print check row
print_check_row() {
    local name=$1
    local passed=$2
    local total=$3
    local status_symbol
    local status_color

    if [[ $passed -eq $total ]]; then
        status_symbol="${GREEN}${CHECKMARK}${RESET}"
    else
        status_symbol="${RED}${CROSS}${RESET}"
    fi

    printf "  %s %-35s %3d/%3d\n" "$status_symbol" "$name" "$passed" "$total"
}

print_check_row "vinculum-core.css" "$pass_core_css" "$total_tools"
print_check_row "vinculum-input.js" "$pass_input_js" "$total_tools"
print_check_row "vinculum-feedback.js" "$pass_feedback_js" "$total_tools"
print_check_row "vinculum-header" "$pass_header" "$total_tools"
print_check_row "feedback div" "$pass_feedback_div" "$total_tools"
print_check_row "no legacy .header" "$pass_no_legacy_header" "$total_tools"

echo

# ═══════════════════════════════════════════════════════════════════
# File Size Warnings
# ═══════════════════════════════════════════════════════════════════

if [[ ${#oversized_files[@]} -gt 0 ]]; then
    print_warning "File size > 35KB (${#oversized_files[@]} files)"
    for file in "${oversized_files[@]}"; do
        printf "    ${YELLOW}•${RESET} %s\n" "$file"
    done
    echo
fi

# ═══════════════════════════════════════════════════════════════════
# Error Report
# ═══════════════════════════════════════════════════════════════════

if [[ ${#errors[@]} -gt 0 ]]; then
    echo -e "${RED}Errors Found (${#errors[@]}):${RESET}"
    for error in "${errors[@]}"; do
        printf "  ${RED}•${RESET} %s\n" "$error"
    done
    echo
fi

# ═══════════════════════════════════════════════════════════════════
# Final Status
# ═══════════════════════════════════════════════════════════════════

echo -e "${BLUE}═══════════════════════════════════════════════════════${RESET}"

if [[ ${#errors[@]} -eq 0 && ${#oversized_files[@]} -eq 0 ]]; then
    echo -e "${GREEN}✓ All validations passed!${RESET}"
    exit 0
elif [[ ${#errors[@]} -eq 0 ]]; then
    echo -e "${YELLOW}⚠ Validation passed with ${#oversized_files[@]} warning(s)${RESET}"
    if [[ "$STRICT_MODE" == true ]]; then
        exit 1
    fi
    exit 0
else
    echo -e "${RED}✗ Validation failed with ${#errors[@]} error(s)${RESET}"
    exit 1
fi
