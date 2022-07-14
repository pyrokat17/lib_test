import { Menu, Icon, SemanticICONS } from "semantic-ui-react";
import React, { ReactElement } from "react";
import axios from "axios";
import createURL from "../../helpers/createURL";
type ROUTER_ACTION = {
	type: string;
	url?: string
}
interface service  {
    title: string;
    urlAction: string;
    urlPrefix: string;
    iconName: SemanticICONS

}
/**
 * 
 * @param {Object} props - next js router object 
 * @returns React element
 */
export default function ServiceMenu({router, services}: {router: (action: ROUTER_ACTION) => void, services: service[]}): ReactElement {


	// state management
	// const [services, setServices] = useState<service[]>([]);
	// useEffect(() => {
	// 	const getServices = async () => {
	// 		try {
	// 			const {data, status} = await axios.get<service[]>(
	// 				createURL("/api/services")
	// 			);
	// 			if (status === 200) {
	// 				setServices(data);
	// 			}
	// 		} catch (e) {
	// 			console.error(e);
	// 		}
	// 	};
	// 	getServices();
	// }, []);

	// sidebar Navigation
	const onClick = (clickType: String, urlPrefix?: String, urlAction?: String) => {
		const urlList = typeof window === undefined ? "" : window.location.pathname.split("/")

		// if a match excute case
		switch (clickType) {
			case "HOME":
				router({type: "BACK_URL", url: "/"})	
			break
			case "ACCOUNT":
				router({type: "BACK_URL", url: "/account"})	
			break
			case "EXTRA_SERVICE":
				router({type: "BACK_URL", url: `${urlPrefix}/orgs/${urlList[2]}/sites/${urlList[4]}/${urlAction}`})
				break					
			
			default:
				break;
		}
		// else route with clickType string
		router({type: "BACK_URL", url: `/orgs/${urlList[2]}/sites/${urlList[4]}/${clickType}`})
	};
	return (
		<>
			{/* Core pages */}
			<Menu.Item onClick={() => onClick("HOME")}>
				<Icon name="home" />
				home
			</Menu.Item>
			<Menu.Item onClick={() => onClick("ACCOUNT")}>
				<Icon name="user" />
				Management
			</Menu.Item>
			<Menu.Item onClick={() => onClick("evex")}>
				<Icon name="sitemap" />
				Event Explorer
			</Menu.Item>
			<Menu.Item onClick={() => onClick("searchable-fields")}>
				<Icon name="search" />
				Searchable Fields
			</Menu.Item>
			{/*  - - - - - - - - - - - - -  */}
			{/* Added services */}
			{!services
				? null
				: services.map((service) => {
						return (
							<Menu.Item
								key={`menu-item-key-${service.title.replace(" ", "-")}`}
								onClick={() =>
									onClick("EXTRA_SERVICE", service.urlPrefix, service.urlAction)
								}
							>
								<Icon name={service.iconName} />
								{service.title}
							</Menu.Item>
						);
				  })}
			{/* <Menu.Item onClick={() => onClick("import")}>
				<Icon name="copy" />
				Import
			</Menu.Item>
			<Menu.Item onClick={() => onClick("picking-tasks")}>
				<Icon name="grab" />
				Picking Tasks
			</Menu.Item> */}
			{/*  - - - - - - - - - - - - -  */}
		</>
	);
}
