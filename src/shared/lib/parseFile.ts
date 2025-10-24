export async function parseTextFile(file: File): Promise<{ en: string; ru: string }[]> {
  const text = await file.text()
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.includes('-'))
    .map(line => {
      const [en, ru] = line.split('-').map(s => s.trim())
      return { en, ru }
    })
    .filter((item): item is { en: string; ru: string } => 
      item.en !== undefined && item.ru !== undefined
    )
}