'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <main className="p-8">
      <h1>Bir hata oluştu</h1>
      <pre>{error.message}</pre>
    </main>
  )
}
