#!/usr/bin/env python3
"""
Script to fix broken header div nesting in VINCULUM Hub HTML files.

The correct structure is:
  <div class="vinculum-header">
    <div class="vinculum-header-left">
      ... content ...
    </div>  <!-- closes vinculum-header-left -->
    <div class="vinculum-header-right">
      <div class="vinculum-std-tags">
        ...
      </div>  <!-- closes vinculum-std-tags -->
    </div>  <!-- closes vinculum-header-right -->
  </div>  <!-- closes vinculum-header -->

  <div class="vinculum-mode-tabs">
"""

import os
import re
from pathlib import Path

def count_divs_in_section(html_content):
    """Count opening and closing divs in the header section."""
    # Find the header section
    header_start = html_content.find('<div class="vinculum-header">')
    if header_start == -1:
        return None, None, None

    mode_tabs_start = html_content.find('<div class="vinculum-mode-tabs">', header_start)
    if mode_tabs_start == -1:
        return None, None, None

    header_section = html_content[header_start:mode_tabs_start]

    # Count opening and closing divs
    open_count = header_section.count('<div')
    close_count = header_section.count('</div>')

    return header_section, open_count, close_count

def fix_header_divs(file_path):
    """Fix the header div nesting in an HTML file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    header_section, open_count, close_count = count_divs_in_section(content)

    if header_section is None:
        return None, content  # File doesn't have the expected header structure

    if open_count == close_count:
        return True, content  # Already correct

    # Calculate how many closing divs we need to add
    missing_closes = open_count - close_count

    if missing_closes > 0:
        # Find the position right before <div class="vinculum-mode-tabs">
        mode_tabs_pos = content.find('<div class="vinculum-mode-tabs">')

        # Find the last </div> before mode-tabs (this should be the current last close in header)
        # We need to insert the missing closes right before the mode-tabs div
        insert_pos = mode_tabs_pos

        # Create the missing closing divs
        # They should be on separate lines for readability
        new_closes = '\n  '.join(['</div>'] * missing_closes) + '\n\n  '

        # Insert the missing closes
        new_content = content[:insert_pos] + new_closes + content[insert_pos:]

        return False, new_content  # Was broken, now fixed

    return None, content  # Unexpected state (closes > opens)

def process_directories(dirs):
    """Process all HTML files in the given directories."""
    stats = {
        'total': 0,
        'already_correct': 0,
        'fixed': 0,
        'no_header': 0,
        'error': 0,
        'files_fixed': [],
        'files_correct': [],
        'files_no_header': []
    }

    for dir_path in dirs:
        tool_dir = Path(dir_path)
        if not tool_dir.exists():
            print(f"Directory not found: {dir_path}")
            continue

        html_files = list(tool_dir.glob('*.html'))

        for html_file in html_files:
            stats['total'] += 1
            try:
                was_correct, new_content = fix_header_divs(str(html_file))

                if was_correct is None:
                    stats['no_header'] += 1
                    stats['files_no_header'].append(html_file.name)
                elif was_correct is True:
                    stats['already_correct'] += 1
                    stats['files_correct'].append(html_file.name)
                else:
                    # was_correct is False, meaning it was fixed
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    stats['fixed'] += 1
                    stats['files_fixed'].append(html_file.name)
                    print(f"✓ Fixed: {html_file.name}")
            except Exception as e:
                stats['error'] += 1
                print(f"✗ Error processing {html_file.name}: {e}")

    return stats

def verify_all_fixed(dirs):
    """Verify that all files now have correct div counts."""
    issues = []

    for dir_path in dirs:
        tool_dir = Path(dir_path)
        if not tool_dir.exists():
            continue

        html_files = list(tool_dir.glob('*.html'))

        for html_file in html_files:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()

            header_section, open_count, close_count = count_divs_in_section(content)

            if header_section is not None and open_count != close_count:
                issues.append({
                    'file': html_file.name,
                    'opens': open_count,
                    'closes': close_count,
                    'missing': open_count - close_count
                })

    return issues

if __name__ == '__main__':
    base_path = '/sessions/stoic-quirky-mendel/mnt/VINCULUM-Hub/tools'
    directories = [
        os.path.join(base_path, 'K'),
        os.path.join(base_path, '1'),
        os.path.join(base_path, '2'),
        os.path.join(base_path, '3'),
        os.path.join(base_path, '4'),
    ]

    print("=" * 70)
    print("VINCULUM Hub Header Div Fixer")
    print("=" * 70)
    print()

    print("Processing HTML files...")
    print()

    stats = process_directories(directories)

    print()
    print("=" * 70)
    print("RESULTS")
    print("=" * 70)
    print(f"Total files processed:     {stats['total']}")
    print(f"Already correct:           {stats['already_correct']}")
    print(f"Fixed:                     {stats['fixed']}")
    print(f"No header found:           {stats['no_header']}")
    print(f"Errors:                    {stats['error']}")
    print()

    if stats['files_fixed']:
        print("Files that were fixed:")
        for fname in sorted(stats['files_fixed']):
            print(f"  - {fname}")
        print()

    if stats['files_correct']:
        print("Files that were already correct:")
        for fname in sorted(stats['files_correct']):
            print(f"  - {fname}")
        print()

    if stats['files_no_header']:
        print("Files with no vinculum-header found:")
        for fname in sorted(stats['files_no_header']):
            print(f"  - {fname}")
        print()

    print("=" * 70)
    print("Verifying all files...")
    print("=" * 70)
    print()

    issues = verify_all_fixed(directories)

    if issues:
        print(f"VERIFICATION FAILED: {len(issues)} file(s) still have issues:")
        for issue in issues:
            print(f"  {issue['file']}: {issue['opens']} opens, {issue['closes']} closes, missing {issue['missing']}")
    else:
        print("✓ VERIFICATION PASSED: All files now have matching div counts!")

    print()
