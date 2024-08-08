import Menu from "../../components/menu/Menu";
import { dataMenu } from "../../data/dataMenu";

export default function Home() {
    return (
        <div className="home">
            <Menu linkMenu={dataMenu}/>
        </div>
    )
}