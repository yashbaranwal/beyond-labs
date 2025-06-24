import { FC } from "react"

interface PageProps {
  params: {
    id: string
  }
}

const Page: FC<PageProps> = ({ params }) => {
  const { id } = params

  return (
    <div>
      <p>test</p>
    </div>
  )
}

export default Page
