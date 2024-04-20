import Item from "@/data/models/item"
import ItemDetail from "./itemDetail"

type Props = {
    itemList: (Item | undefined)[]
    userIsOwner?: boolean;
    completed?: true;
    processReceived?: Function;
}

const ItemDetailList = ({ itemList, userIsOwner, completed, processReceived }: Props) => {
    return (
        <div className="">
            {/* <h3>{userIsOwner ? 'My Items Dibbed' : 'Items I Dibbed'}</h3>   */}
            <div className="flex justify-between my-2 mx-3">
                {/* <h5>Item Name</h5> */}
                <h1>{completed ? 'Completed' : userIsOwner ? 'My Items Dibbed' : 'Items I Dibbed'}</h1>  
                {/* <h5>{userIsOwner ? 'DibsCaller' : 'Item Owner'}</h5> */}
                <h1 className="">{completed ? '' : userIsOwner ? 'Sent' : 'Received'}</h1>
            </div>
            <ul className="flex flex-col gap-2">
                {itemList?.map((item, index) => {
                    return (
                        !!item && <ItemDetail key={index} item={item} userIsOwner={userIsOwner} completed={completed} processReceived={processReceived} />
                    )
                })}

            </ul>
            

        </div>
    )
}
export default ItemDetailList;