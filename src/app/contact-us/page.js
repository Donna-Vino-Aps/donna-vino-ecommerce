"use client";
import React from "react";
import Button from "@/components/Button/Button";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="relative flex flex-col items-center bg-[#FDE8E9] min-h-screen">
      <div className="w-100  mt-20  ">
        <h1 className=" text-headlineMedium text-primary-normal text-left ml-[145px] h-[56px]">
          Get in Touch with Us
        </h1>

        <div className="relative bg-white mr-20 mb-10 ml-20 rounded-2xl shadow-lg w-[1170px] h-[608px]">
          <div className="flex justify-between">
            <div className="w-1/2 pt-[30px] pr-[100px] pb-[30px] pl-[70px] ">
              <form className="flex flex-col gap-[16px]">
                <h4>
                  We’d love to hear from you! If you have any questions,
                  feedback, or need assistance, feel free to reach out. You can
                  use the contact form here, and our team will get back to you
                  as soon as possible.
                </h4>

                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Your Name"
                />

                <input
                  type="email"
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Your Email Address"
                />

                <input
                  type="tel"
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Your Phone Number"
                />

                <textarea
                  className="p-2 border border-gray-300 rounded-lg mb-4"
                  rows="4"
                  placeholder="Your Message"
                ></textarea>

                <Button text="Send Message" variant="greenSubmit" />
              </form>
            </div>

            <Image
              src="/shapes.svg"
              width={600}
              height={608}
              alt="wine glasses"
            ></Image>
          </div>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-full bg-white pt-[80px] pr-[135px] pb-[80px] pl-[135px]">
        <div className="mt-10 w-[1170px] h-[536px] bg-tertiary1-light rounded-[32px]">
          <div className="flex justify-between">
            <div className="w-1/2 ">
              <iframe
                title="Google Map - Wildersgade 23"
                className="rounded-tl-[32px] rounded-bl-[32px] w-[570px] h-[536px]"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.307525394059!2d12.587214!3d55.673076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253055a66b6b1%3A0x851826f065df307d!2sWildersgade%2023%2C%201401%20K%C3%B8benhavn%2C%20Denmark!5e0!3m2!1sen!2sdk!4v1711057038012!5m2!1sen!2sdk"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="w-1/2 h-[536px] p-[32px] gap-[35px] flex flex-col ">
              <h1 className="text-tertiary1-darker font-light text-displayMedium">
                Where can you find us?
              </h1>
              <div className=" w-100  gap-[24px] flex flex-col ">
                <div className="flex gap-[24px]">
                  <div className="bg-secondary-active w-[70px] h-[70px] round-[5px] ">
                    <img
                      className="relative w-[32px] h-[32px] top-[19px] left-[19px]"
                      src="./icons/contact/house-alt-1.svg"
                    ></img>
                  </div>
                  <div className=" justify-center gap-[10px] flex  flex-col  items-left">
                    <h5 className="text-tertiary1-darker font-semibold ">
                      Our Location
                    </h5>
                    <h6 className="text-tertiary1-dark">
                      Wildersgade, 23 | 1408 København K
                    </h6>
                  </div>
                </div>

                <div className="w-100 ">
                  <div className="flex gap-[24px] ">
                    <div className="bg-secondary-active w-[70px] h-[70px] round-[5px] ">
                      <img
                        className="relative w-[32px] h-[32px] top-[19px] left-[19px]"
                        src="./icons/contact/phone-ring.svg"
                      ></img>
                    </div>
                    <div className=" justify-center gap-[10px] flex  flex-col  items-left">
                      <h5 className="text-tertiary1-darker font-semibold">
                        Phone Number
                      </h5>
                      <h6 className="text-tertiary1-dark">+45 12 34 56 78</h6>
                    </div>
                  </div>
                </div>

                <div className="w-100">
                  <div className="flex gap-[24px]">
                    <div className="bg-secondary-active w-[70px] h-[70px] round-[5px] ">
                      <img
                        className="relative w-[32px] h-[32px] top-[19px] left-[19px]"
                        src="./icons/contact/envelope.svg"
                      ></img>
                    </div>
                    <div className="justify-center gap-[10px] flex  flex-col  items-left">
                      <h5 className="text-tertiary1-darker font-semibold">
                        Email Address
                      </h5>
                      <h6 className="text-tertiary1-dark">info@donnavino.dk</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[181px]">
                <Button
                  icon="./icons/contact/map.svg"
                  text="Check on Maps"
                  variant="black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
