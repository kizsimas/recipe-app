import Header from "../Header";

export const Layout = (props: any) => {
  return (
      <div>
        <Header />
        <main>{props.children}</main>
      </div>
  )
}