import Link from "next/link"

export const Layout = (props: any) => {
  return (
    <>
    <div className="flex-1">
      <div className="text-3xl mr-2">
        <Link href="/" >
          <a >Home</a>
        </Link>
      </div>
      <div className="text-3xl mr-2">
        <Link href="/recipes">
          <a>Recipes</a>
        </Link>
      </div>
    </div>
    <main>{props.children}</main>
    </>
  )
}