import axios from 'axios'

type Post = {
  id: string
  title: string
  content: string
}

export default async function App() {
  const { data } = await axios.get<Post[]>('http://localhost:8080/posts')

  return (
    <div className="flex flex-col gap-2 p-4">
      {data.map(item => (
        <div key={item.id} className="border flex flex-col gap-2 p-4">
          <h2>{item.title}</h2>
          <p className="pl-4 italic">{item.content}</p>
        </div>
      ))}
    </div>
  )
}
