import Link from "next/link";
export default function NavBar() {
	return (
		<div className="row flex-center flex">
			<ul>
				<li>
					<Link href="/">
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href="/login">
						<a>login</a>
					</Link>
				</li>
				<li>
					<Link href="/signup">
						<a>signup</a>
					</Link>
				</li>
				<li>
					<Link href="/post">
						<a>posts</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}
