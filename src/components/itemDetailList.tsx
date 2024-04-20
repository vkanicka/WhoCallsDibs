import Item from "@/data/models/item"
import ItemDetail from "./itemDetail"

type Props = {
    itemList: (Item | undefined)[]
    userIsOwner: boolean;
}

const ItemDetailList = ({ itemList, userIsOwner }: Props) => {
    return (
        <div>
            <h3>{userIsOwner ? 'My Items Dibbed' : 'Items I Dibbed'}</h3>  
            <div className="flex justify-between">
                <h5>Item Name</h5>
                <h5>{userIsOwner ? 'DibsCaller' : 'Item Owner'}</h5>
            </div>
            <ul>
                {itemList?.map((item, index) => {
                    return (
                        <ItemDetail key={index} item={item} userIsOwner={userIsOwner} />
                    )
                })}

            </ul>

        </div>
    )
}
export default ItemDetailList;