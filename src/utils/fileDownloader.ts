/**
 * Generates an actual downloadable text/document blob in the browser
 * so when students click download, their browser saves a realistic official document.
 */
export function downloadAcademicFile(filename: string, title?: string, content?: string) {
  const header = `==========================================================\n` +
                 `CHANDIGARH GROUP OF COLLEGES (CGC) MOHALI\n` +
                 `Affiliated to I.K. Gujral Punjab Technical University (PTU)\n` +
                 `Document: ${title || filename}\n` +
                 `Generated Date: ${new Date().toLocaleDateString('en-IN')}\n` +
                 `==========================================================\n\n`;

  const body = content ||
    `Official Academic Resource Record:\n` +
    `Course: B.Tech Computer Science & Engineering\n` +
    `Campus: Landran & Jhanjeri Campuses, Mohali (Punjab)\n\n` +
    `Contents:\n` +
    `- PTU Syllabus Aligned Handouts\n` +
    `- Verified Faculty Derivations & Numerical Examples\n` +
    `- Past Year Exam Frequency Analysis\n\n` +
    `Ref Code: CGC/IKGPTU/ACAD/${Math.floor(100000 + Math.random() * 900000)}\n` +
    `Downloaded via CGC Mohali Student Portal.\n`;

  const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename.endsWith('.pdf') ? filename.replace('.pdf', '.txt') : filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
