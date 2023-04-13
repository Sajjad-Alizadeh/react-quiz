import Toggle from "./Toggle";

export default function SideBar(props) {
    return (
        <aside>
            {
                props.boxes.map((box) => {
                    return <Toggle box={box} handleToggleClick={props.handleToggleClick}/>
                })
            }

        </aside>
    );
}