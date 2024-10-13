import Image from "next/image";
import image_contactus from "../../../assets/contactus.webp";

export default function ContactUsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-12 py-12">Contact Us</h1>
      {/* Contact Information Section */}
      <section className=" rounded-lg shadow-md p-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-md mb-2">
            <strong>Phone:</strong> (555) 123-4567
          </p>
          <p className="text-md mb-2">
            <strong>Email:</strong> info@purrfect_care.com
          </p>
          <p className="text-md mb-2">
            <strong>Address:</strong> 123 Main Lane, Cyclestown, BK 12345
          </p>
        </div>
        <div className="col-span-1">
          <Image
            src={image_contactus}
            alt="Contact Us"
            className="object-cover w-full h-64 rounded"
          />
        </div>
      </section>
    </div>
  );
}
