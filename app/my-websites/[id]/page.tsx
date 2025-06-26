import WebsiteForm from "../_components/website-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params } : PageProps){
  const { id } = await params

  return (
    <WebsiteForm id={id} />
  )
}