// import React from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { handleError, handleSuccess } from '../../../utils';
// import { ToastContainer } from 'react-toastify';
// const ProductForm = () => {
//     const { register, handleSubmit, reset,formState: { errors } } = useForm();

//     const onSubmit = async (data) => {
//         try {
//             // Replace the URL with your API endpoint
//             const response = await axios.post('http://localhost:4040/product/addProduct', data);
//             console.log(response.status);
            
//             if (response.status==200) {
//                 // Handle successful response
//                 handleSuccess('Product created successfully!');
//                 reset();
//             } else {
//                 // Handle error response
//                 handleError('Failed to create product');
//             }
//         } catch (error) {
//             console.error('An error occurred:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <label htmlFor="brand">Brand</label>
//                 <input name="brand" {...register('brand', { required: 'Brand is required' })} />
//                 {errors.brand && <p>{errors.brand.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="title">Title</label>
//                 <input name="title" {...register('title', { required: 'Title is required' })} />
//                 {errors.title && <p>{errors.title.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="category">Category</label>
//                 <input name="category" {...register('category', { required: 'Category is required' })} />
//                 {errors.category && <p>{errors.category.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="subCategory">Subcategory</label>
//                 <input name="subCategory" {...register('subCategory', { required: 'Subcategory is required' })} />
//                 {errors.subCategory && <p>{errors.subCategory.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="price">Price</label>
//                 <input name="price" type="nu-er" {...register('price', { required: 'Price is required' })} />
//                 {errors.price && <p>{errors.price.message}</p>}
//             </div>

//             <div>
//                 <label htmlFor="discount">Discount</label>
//                 <input name="discount" type="nu-er" {...register('discount')} />
//             </div>

//             <div>
//                 <label htmlFor="images">Images (URL)</label>
//                 <input name="images" {...register('images')} />
//             </div>

//             <div>
//                 <label htmlFor="barcode">Barcode</label>
//                 <input name="barcode" {...register('barcode')} />
//             </div>

//             <div>
//                 <label htmlFor="minOrderQty">Minimum Order Quantity</label>
//                 <input name="minOrderQty" type="nu-er" {...register('minOrderQty')} />
//             </div>

//             <div>
//                 <label htmlFor="deliveryDate">Delivery Date</label>
//                 <input name="deliveryDate" type="date" {...register('deliveryDate')} />
//             </div>

//             <div>
//                 <label htmlFor="stock">Stock</label>
//                 <input name="stock" type="nu-er" {...register('stock')} />
//             </div>

//             <div>
//                 <label htmlFor="returnPolicy">Return Policy</label>
//                 <textarea name="returnPolicy" {...register('returnPolicy')} />
//             </div>

//             <div>
//                 <label htmlFor="weight">Weight</label>
//                 <input name="weight" type="nu-er" step="0.01" {...register('weight')} />
//             </div>

//             <button type="submit">Create Product</button>
//             <ToastContainer/>
//         </form>
       
//     );
// };

// export default ProductForm;




import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { handleError, handleSuccess } from '../../../utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:4040/product/addProduct', data);
            if (response.status === 200) {
                handleSuccess('Product created successfully!');
                reset();
            } else {
                handleError('Failed to create product');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            handleError('An unexpected error occurred');
        }
    };

    return (
        <div className="container ">
            <h2 className="">Add Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
                <div className="form-group --1">
                    <label htmlFor="brand" className="form-label">Brand *</label>
                    <input id="brand" name="brand" className={`form-control ${errors.brand ? 'is-invalid' : ''}`} {...register('brand', { required: 'Brand is required' })} />
                    {errors.brand && <div className="invalid-feedback">{errors.brand.message}</div>}
                </div>

                <div className="form-group --3">
                    <label htmlFor="title" className="form-label">Title *</label>
                    <input id="title" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register('title', { required: 'Title is required' })} />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                <div className="form-group --3">
                    <label htmlFor="category" className="form-label">Category *</label>
                    <select name="category" id="category" className={`form-control ${errors.category ? 'is-invalid' : ''}`} {...register('category', { required: 'Category is required' })} >
                    <option value="electronics">electronics</option>
                    <option value="men" >men</option>
                    <option value="women">women</option>
                    <option value="pantry" >pantry</option>
                    </select>
                    {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
                </div>

                <div className="form-group --3">
                    <label htmlFor="subCategory" className="form-label"> *</label>
                    <select id="subCategory" name="subCategory" className={`form-control ${errors.subCategory ? 'is-invalid' : ''}`} {...register('subCategory', { required: 'Subcategory is required' })} >
                        <option value="mobiles">mobiles</option>
                        <option value="speaker" >speaker</option>
                        <option value="camera">camera</option>
                        <option value="footwear" >footwear</option>
                        <option value="clothing">clothing</option>
                        <option value="grooming" >grooming</option>
                        <option value="watches">watches</option>
                        <option value="beauty" >beauty</option>
                        <option value="groceries" >groceries</option>
                    </select>
                    {errors.subCategory && <div className="invalid-feedback">{errors.subCategory.message}</div>}
                </div>

                <div className="form-group --3">
                    <label htmlFor="price" className="form-label">Price *</label>
                    <input id="price" name="price" type="nu-er" className={`form-control ${errors.price ? 'is-invalid' : ''}`} {...register('price', { required: 'Price is required' })} />
                    {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                </div>

                <div className="form-group --3">
                    
                    <label htmlFor="discount" className="form-label">Discount  % </label>
                    <input id="discount" name="discount" type="nu-er" className="form-control" {...register('discount')} />
                </div>

                <div className="form-group --3">
                    <label htmlFor="images" className="form-label">Images (URL) *</label>
                    <input id="images" name="images" className={`form-control ${errors.price ? 'is-invalid' : ''}`} {...register('images',{required:'product image is required'})} />
                    {errors.images && <div className="invalid-feedback">{ errors.images.message}</div>}
                </div>

                <div className="form-group --3">
                    <label htmlFor="barcode" className="form-label">Barcode</label>
                    <input id="barcode" name="barcode" className="form-control" {...register('barcode')} />
                </div>

                <div className="form-group --3">
                    <label htmlFor="minOrderQty" className="form-label">Minimum Order Quantity</label>
                    <input id="minOrderQty" name="minOrderQty" type="number" className="form-control" min="0" {...register('minOrderQty')} />
                </div>

                <div className="form-group --3">
                    <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                    <input id="deliveryDate" name="deliveryDate" type="date" className="form-control" {...register('deliveryDate')} />
                </div>

                <div className="form-group --3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input id="stock" name="stock" type="nu-er" className="form-control" {...register('stock')} />
                </div>

                <div className="form-group --3">
                    <label htmlFor="returnPolicy" className="form-label">Return Policy </label>
                    <select id="returnPolicy" name="returnPolicy" className="form-control" {...register('returnPolicy')} >
                        <option value="No Return Policy">No Return Policy</option>
                        <option value="7 Days" >7 Days</option>
                        <option value="10 Days" >10 Days</option>
                        <option value="14 Days" >14 Days</option>
                    </select>
                </div>

                <div className="form-group --3">
                    <label htmlFor="weight" className="form-label">Weight</label>
                    <input id="weight" name="weight" type="nu-er" step="0.01" className="form-control" {...register('weight')} />
                </div>

                <button type="submit" className="btn btn-primary">Create Product</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductForm;
