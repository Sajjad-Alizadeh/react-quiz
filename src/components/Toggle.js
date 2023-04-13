function Toggle(props) {
    return (
        <div className="toggle">
            <span>{props.box.name}</span>
            <label className="toggle-control">
                <input type="checkbox" checked={props.box.isActive}/>
                <span className="control" onClick={() => {
                    props.handleToggleClick(props.box.id)
                }
                }></span>
            </label>
        </div>
    );
}

export default Toggle