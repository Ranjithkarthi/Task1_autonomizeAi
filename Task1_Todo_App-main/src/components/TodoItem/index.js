import "./index.css"

const TodoItem = (props) => {
    const {itemDetails, toEditTheText, toDeleteItem}  = props
    // console.log(itemDetails)
    const {id, text, update, changed} = itemDetails
    // console.log(id, text, update, changed)

    const onEditButton = () => {
        toEditTheText(id)
    }

    const ondltButton = () => {
        toDeleteItem(id)
    }

    return (
        <div className = "item-container">
            <p className = "item-name">{text} {update>0 ? <span className = "span-element">(Updating {update} Times)</span> : <span className = "span-element">(Changes {changed} Times)</span>}</p>
            <div className = "item-inner-container">
                <button className = "edit-button" type = "button" onClick = {onEditButton}>
                    <img className  = "edit-icon" src = "https://res.cloudinary.com/dl1iui8u1/image/upload/v1710149666/icons8-pencil-64_np8o0e.png" alt = "edit" />
                </button>
                <button className = "close-button" type = "button" onClick = {ondltButton}>
                    <img className = "close-icon" src = "https://res.cloudinary.com/dl1iui8u1/image/upload/v1710146306/Pngtree_icon_close_button_6274953_gsopbk.png" alt = "close"/>
                </button>
            </div>
        </div>        
    )
}

export default TodoItem