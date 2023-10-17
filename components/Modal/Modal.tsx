'use client';
import { FormEvent, Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { addUserEmailToProduct } from '@/lib/actions';

const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addUserEmailToProduct();
    setIsSubmitting(false);
    setEmail('');
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(isOpen ? false : true);
  };
  return (
    <>
      <button type="button" className="btn" onClick={toggleModal}>
        Track
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={toggleModal} as="div" className="dialog-container">
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0"></Dialog.Overlay>
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden={true}
            />

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveTo="opacity-0 scale-95"
              leaveFrom="opacity-100 scale-100"
            >
              <div className="dialog-content">
                <div className="flex flex-column">
                  <div className="flex justify-between w-full">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={toggleModal}
                    />
                  </div>
                  <h4 className="dialog-head_text">
                    Stay Updated with product pricing alerts!
                  </h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargin again!
                  </p>
                </div>
                <form
                  className="flex flex-col mt-5"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <label
                    htmlFor="email"
                    className="text-sm font-md text-gray-700"
                  >
                    Email Address:
                  </label>
                  <div className="dialog-input_container">
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="mail"
                      width={18}
                      height={18}
                      className=""
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      name="email"
                      id="email"
                      placeholder="Enter your email address"
                      className="dialog-input"
                    />
                  </div>
                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? 'Tracking...' : 'Track'}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
