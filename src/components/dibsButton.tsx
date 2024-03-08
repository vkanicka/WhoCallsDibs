'use client'

import Item from "@/data/models/item";

type Props = {
    item: Item;
}

const callDibs = (item: Item) => {
    console.log(`Calling dibs on item ${item.$id}`)
    // open dibs modal or redirect to confirmation message page
    // are you sure confirm button before sending
    // confirm address
    // are you willing to pay postage if owner hasn't offered? 
    // if so, up to what amount?
}

const DibsButton = ({ item }: Props) => {
    return (
        <button onClick={()=>callDibs(item)} className="w-full my-2 border-2 border-solid border-violet-400 rounded-xl py-2 px-4 bg-green-600 text-violet-900">
            I call dibs!
        </button>
    )
}
export default DibsButton;