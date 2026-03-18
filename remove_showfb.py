#!/usr/bin/env python3
"""
Remove multi-line showFB function definitions from HTML files.
These are safe to remove because vinculum-feedback.js provides a global showFB(t,c).
"""

import os
import re
import subprocess

def find_files_with_showfb(root_dir):
    """Find all files containing 'function showFB'"""
    result = subprocess.run(
        ['grep', '-rl', 'function showFB', root_dir],
        capture_output=True,
        text=True
    )
    return [f.strip() for f in result.stdout.split('\n') if f.strip()]

def remove_showfb_function(file_path):
    """
    Remove the multi-line showFB function definition from a file.
    Tracks brace depth to find the matching closing brace.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    start_idx = -1
    end_idx = -1

    # Find the line with "function showFB"
    for i, line in enumerate(lines):
        if 'function showFB' in line:
            start_idx = i
            break

    if start_idx == -1:
        return False, "Function not found"

    # Find the matching closing brace by tracking brace depth
    brace_depth = 0
    found_opening = False

    for i in range(start_idx, len(lines)):
        line = lines[i]

        # Count braces in this line
        for char in line:
            if char == '{':
                brace_depth += 1
                found_opening = True
            elif char == '}':
                brace_depth -= 1
                if found_opening and brace_depth == 0:
                    end_idx = i
                    break

        if end_idx != -1:
            break

    if end_idx == -1:
        return False, f"Could not find matching closing brace (started at line {start_idx})"

    # Remove the function (lines from start_idx to end_idx inclusive)
    new_lines = lines[:start_idx] + lines[end_idx + 1:]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    return True, f"Removed function from lines {start_idx + 1} to {end_idx + 1}"

def main():
    tools_dir = '/sessions/stoic-quirky-mendel/mnt/VINCULUM-Hub/tools'

    print("Finding files with 'function showFB'...")
    files = find_files_with_showfb(tools_dir)
    print(f"Found {len(files)} files\n")

    removed_count = 0
    failed_count = 0

    for file_path in sorted(files):
        success, message = remove_showfb_function(file_path)
        status = "✓" if success else "✗"
        rel_path = file_path.replace(tools_dir + '/', '')
        print(f"{status} {rel_path}: {message}")

        if success:
            removed_count += 1
        else:
            failed_count += 1

    print(f"\n--- Summary ---")
    print(f"Successfully removed: {removed_count}")
    print(f"Failed: {failed_count}")

    # Verify
    print("\nVerifying removal...")
    remaining = find_files_with_showfb(tools_dir)
    if remaining:
        print(f"⚠ WARNING: {len(remaining)} files still contain 'function showFB':")
        for f in remaining:
            print(f"  - {f}")
    else:
        print("✓ All functions successfully removed!")

if __name__ == '__main__':
    main()
