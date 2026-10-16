import pathlib

root = pathlib.Path('/home/user/yamashiro-office/packages/web/src')
BAD = ['未定', '確定させ', '公開前に']
BAD.append(chr(0xFFFD))  # U+FFFD replacement character (mojibake)
issues = []
for p in sorted(root.rglob('*')):
    if p.suffix in ('.tsx', '.ts', '.html', '.css'):
        try:
            text = p.read_text(encoding='utf-8')
        except Exception:
            issues.append((str(p), 'DECODE ERROR'))
            continue
        for bad in BAD:
            if bad in text:
                for i, line in enumerate(text.splitlines(), 1):
                    if bad in line:
                        issues.append((str(p), i, bad, line.strip()[:80]))
if issues:
    for it in issues:
        print(it)
else:
    print('CLEAN: no issues found')
