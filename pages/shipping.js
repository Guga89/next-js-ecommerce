import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    phoneNumber,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        phoneNumber,
      },
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          phoneNumber,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping ADdress">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            autoFocus
            id="fullName"
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 6, message: 'Address is more than 5 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Please enter city',
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone number</label>
          <input
            className="w-full"
            id="phoneNumber"
            {...register('phoneNumber', {
              required: 'Enter your phone number',
              minLength: { value: 8, message: 'Enter valid number' },
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500">{errors.phoneNumber.message}</div>
          )}
        </div>
        <button className="primary-button">Next</button>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;
