import React, { ReactNode } from "react";
// components
import { Sidebar, Menu, SemanticICONS } from "semantic-ui-react";
// import { ToastContainer } from "react-toastify";
// import Footer from '@/components/layout/Footer';
import Header from "./Header";
// Styles
import "./Layout.scss";
import AppLayout from "./AppLayout";
// requests
import axios from "axios";
import ServiceMenu from "../ServiceMenu/ServiceMenu";


type User = {
	id: number;
	username: string
}
export interface AuthContextInterface {
	user: User | null | undefined;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	//settings: state.settings,
}

type ROUTER_ACTION = {
	type: string;
	url?: string
}
 
interface LayoutProps {
	title?: string;
	backUrl?: string;
	nav?: ReactNode;
	display: ReactNode;
	bottom: ReactNode;
	popdown: ReactNode;
	popdownIcon: SemanticICONS;
	layoutType: string;
	children?: ReactNode;
	router: (action: ROUTER_ACTION) => void;
	auth: AuthContextInterface;
	services: service[]
}
type GetDemnoKitStatus = {
	DEMO_KIT: boolean
}
interface service  {
    title: string;
    urlAction: string;
    urlPrefix: string;
    iconName: SemanticICONS

}
/**
 *
 * @param {Object} props // props given to component
 * @return {ReactNode} return Layout
 */
export default function Layout({
	title,
	backUrl,
	nav,
	display,
	bottom,
	popdown,
	popdownIcon,
	layoutType,
	children,
	router,
	auth,
	services
}: LayoutProps): ReactNode {
	
	
	// const [demo, setDemo] = React.useState<boolean>(true);
	// const [visible, setVisible] = React.useState<boolean>(false);
	// state managemnet


	// context object
	// const { settings } = useContext(AuthContext);
// useEffect(() => {
// 		const getDemo = async () => {
// 			try {
// 				const res = await axios.get<GetDemnoKitStatus>("/api/demo");
// 				if (res.statusText === "OK") {
// 					setDemo(res.data.DEMO_KIT || false);
// 				}
// 			} catch (e) {
// 				console.error(e);
// 				setDemo(false);
// 			}
// 		};
// 		getDemo();
// 	}, []);
	// state managemnet
	// side bar state
	

	// function for back button in nav section to either
	// go back one in browser history or to previous page in site path
	const backClicked = (): void => {
		if (typeof backUrl === "string") {
			router({type: "BACK_URL", url: backUrl});
		} else {
			router({type: "BACK", url: backUrl});

		}
	};

	// handle header icon navigation
	const headerNav = (iconName: string): void => {
		switch (iconName) {
			case "home":
				router({type: "BACK_URL", url: "/"})
				break
			case "account":
				try {
					router({type: "BACK_URL", url: "/account"})
				} catch (e) {
					console.error(e);
				}
				break;
			case "signin":
				router({type: "BACK_URL", url: '/'})	
				default:
				break;
		}
	};

	const renderLayout = (type: string) => {
		switch (type) {
			case "three-panel":
				return (
					<div>
						<AppLayout
							nav={nav}
							display={display}
							bottom={bottom}
							popdown={popdown}
							back={backUrl}
							backClicked={backClicked}
							popdownIcon={popdownIcon}
						/>
					</div>
				);
			// case "two-panel":
			// 	return (
			// 		<div id="app-container" className={styles["two-panel-app-container"]}>
			// 			<Resizable
			// 				minWidth={"20%"}
			// 				size={{ width: navWidth, height: "94vh" }}
			// 				className={styles["nav-container"] + " scrollbar-thin"}
			// 				id="nav-container-id"
			// 				onResizeStop={(e, direction, ref, d) => {
			// 					const appContainer = document.getElementById("app-container");
			// 					setNavWidth(navWidth + d.width);
			// 					setBodyWidth(appContainer.clientWidth - navWidth);
			// 				}}
			// 			>
			// 				<div className={styles["nav-back-button"]}>
			// 					{/* if backButton is present render in nav section*/}
			// 					{demo ? null : backButton ? (
			// 						<div onClick={onBack}>
			// 							<i
			// 								className={`arrow alternate circle left big yellow icon ${styles["arrow-icon"]}`}
			// 							/>
			// 						</div>
			// 					) : null}
			// 					{/* </div> */}
			// 				</div>
			// 				{navChild}
			// 			</Resizable>

			// 			{/* Body selection render element passed in as bodyChildren */}
			// 			<div
			// 				className={styles["body-container"] + " scrollbar-thin"}
			// 				id="body-container-id"
			// 				style={{
			// 					width: `${bodyWidth}px`,
			// 				}}
			// 			>
			// 				{bodyChild}
			// 			</div>
			// 		</div>
			// 	);
			default:
				return <div className="full-app-container">{children}</div>;
		}
	};
	return (
		<div>
			{/* Toast container for entire app */}
			{/* <ToastContainer /> */}
			{/* Document Head */}
			{/* <Head>
				<title>{title}</title>
			</Head> */}

			{/* Website header */}
			<div className="header-container">
				<Header
					sidebar={
						typeof window == "undefined" ?
						 false : window.location.pathname.includes("[site_id]") ? true : false}
					showSideBar={() => console.log(true)}
					headerNav={headerNav}
					auth={auth}
				/>
			</div>
			{/* Website Body/Content */}
			{/* <Sidebar.Pushable>
				<Sidebar
					as={Menu}
					animation="overlay"
					icon="labeled"
					// inverted
					onHide={() => setVisible(false)}
					vertical
					visible={visible}
					width="thin"
				>
					<ServiceMenu router={router} services={services} />
				</Sidebar>
				<Sidebar.Pusher>{renderLayout(layoutType)}</Sidebar.Pusher>
			</Sidebar.Pushable> */}
			{/* Website footer - currently not using a footer */}
			{/* <Footer /> */}
		</div>
	);
}

