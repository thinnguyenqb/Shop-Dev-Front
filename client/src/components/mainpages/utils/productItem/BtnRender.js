import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { IoBagAddOutline } from 'react-icons/io5';


function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_delete" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_edit" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                            <div className="btn_buy-item">
                                <IoBagAddOutline size="1.6rem" />
                            </div>
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender
