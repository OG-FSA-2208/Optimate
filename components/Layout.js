import NavBar from "./NavBar";
export default function Layout({ children }) {
	return (
		<>
			<NavBar session={children.props.session}/>
			<main>{children}</main>
		</>
	);
}
