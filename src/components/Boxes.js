import Box from "./Box";

export default function Boxes(props) {
    return (
        <div className="box-wrapper">
            {
                props.boxes.map(box => {
                    if (box.isActive) {
                        return <Box name={box.name}/>
                    }
                })
            }
        </div>
    );
}