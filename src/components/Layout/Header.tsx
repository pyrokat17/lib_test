import React,{ ReactNode } from "react";
import "./Header.scss";
import { Icon } from "semantic-ui-react";
type User = {
	id: number;
	username: string
}
interface AuthContextInterface {
	user: User | null | undefined;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	//settings: state.settings,
}


interface HeaderProps {
	sidebar: boolean;
	showSideBar: () => void;
	headerNav: (iconName: string) => void
	auth: AuthContextInterface
}


export default function Header({ sidebar,showSideBar, headerNav, auth  }: HeaderProps): JSX.Element {
	return (
		<div className="header-icons">
			{sidebar ? (
				<Icon
					className="icon-hover"
					link
					name="bars"
					size="large"
					onClick={() => showSideBar()}
				/>
			) : (
				<Icon />
			)}
			<Icon
				className="icon-hover"
				link
				name="home"
				size="large"
				color="blue"
				onClick={() => headerNav("home")}
			/>
			<div style={{ marginRight: "1vw" }}>
				{!auth?.user ? (
					<Icon
						className="icon-hover"
						link
						name="sign-in"
						size="large"
						onClick={() => headerNav("signin")}
					/>
				) : (
					<div className="user">
						<p className="user-name">{auth?.user.username}</p>
						<Icon
							link
							size="large"
							name="user"
							className={`user-icon icon-hover`}
							onClick={() => headerNav("account")}
						/>

						<Icon
							link
							size="large"
							name="sign-out"
							className={`sign-out-icon`}
							onClick={() => {
								auth?.logout();
								headerNav("home");
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
