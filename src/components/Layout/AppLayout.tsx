import React, { Fragment, ReactNode } from "react";
import {
	Breadcrumb,
	Button,
	Icon,
	Menu,
	Popup,
	SemanticICONS
} from "semantic-ui-react";
// style
import "./AppLayout.scss";

interface AppLayoutProps {
	nav?: ReactNode;
	display: ReactNode;
	bottom: ReactNode;
	popdown: ReactNode;
	popdownIcon: SemanticICONS;
	back: boolean | null | string | undefined;
	backClicked: () => void
	
}



export default function AppLayout({
	nav,
	display,
	bottom,
	popdown,
	popdownIcon,
	back,
	backClicked,
}: AppLayoutProps) {
	// const [viewPopdown, setViewPopdown] = useState(false);
	return (
		<>
			<main className="app-container">
				<section
					id="nav-container-id"
					className="overflow-y-scroll scrollbar-thin nav"
				>
					<>
						<Menu size="mini" attached="top" tabular>
							<Menu.Item position="left">
							{back ? (
											<Icon
												name="arrow alternate circle left"
												size="large"
												color="yellow"
												link
												onClick={backClicked}
											/>
										) : null}
							</Menu.Item>

							{/* <Menu.Item
								position="right"
								link
								onClick={() => setViewPopdown(viewPopdown ? false : true)}
							>
								{!popdown ? null : (
									<Popup
										content="Filter list"
										trigger={
											<Icon name={popdownIcon || "search"} size="large" />
										}
									/>
								)}
							</Menu.Item> */}
						</Menu>
						{/* {!popdown ? null : (
							<>
								{viewPopdown ? (
									<div>
										{popdown}
										<Button
											style={{ marginTop: "1vh" }}
											size="tiny"
											onClick={() => setViewPopdown(viewPopdown ? false : true)}
											floated="right"
											icon={`angle ${viewPopdown ? "up" : "down"}`}
										/>
									</div>
								) : null}
							</>
						)} */}
						{nav}
					</>
				</section>
				<section
					className="overflow-y-scroll scrollbar-thin display"
				>
					<div>{display}</div>
				</section>
			</main>

			<section className="bottom">{bottom} </section>
		</>
	);
}
