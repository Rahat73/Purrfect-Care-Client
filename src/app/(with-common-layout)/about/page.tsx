import Image from "next/image";
import petsImage1 from "../../../assets/pets1.jpg";
import petsImage2 from "../../../assets/pets2.jpg";
import image_team1 from "../../../assets/team-1.jpg";
import image_team3 from "../../../assets/team-2.jpg";
import image_team2 from "../../../assets/team-3.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen mx-auto text-default-600">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-12">About Us</h1>

        {/* Our Company Section */}
        <section className="rounded-lg shadow-md p-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="col-span-1">
            <Image
              src={petsImage1}
              alt="Bike Category"
              className="object-cover w-full h-64 rounded"
            />
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Our Company</h2>
            <p className="text-sm mb-4">
              Welcome to <strong>Purrfect Care</strong>, your go-to resource for
              pet care tips and stories. Our mission is to help pet owners
              understand and fulfill the needs of their beloved animals through
              expert advice, engaging stories, and personalized content.
            </p>
          </div>
        </section>

        {/* Our Mission and Vision Section */}
        <section
          className=" rounded-lg shadow-md p-5 mb-12 bg-fixed"
          style={{
            backgroundImage: `url(${petsImage2.src})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-black bg-opacity-75 rounded-lg text-white/80 p-10">
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-sm mb-4">
                At <strong>Purrfect Care</strong>, we are passionate about
                providing pet owners with the best guidance and resources. Our
                platform not only gives users access to essential information
                about pet nutrition, health, and wellness but also allows them
                to share their own experiences and learn from a vibrant
                community of animal lovers.
              </p>
            </div>
            <div className="col-span-1">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-sm mb-4">
                Our vision is to create a world where every pet is well-cared
                for and every pet owner feels empowered with the knowledge they
                need to ensure a happy and healthy life for their companions.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className=" rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src={image_team1}
                alt="John Doe"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <Image
                src={image_team2}
                alt="Jane Smith"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
            <div className="text-center">
              <Image
                src={image_team3}
                alt="Mike Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">Mike Johnson</h3>
              <p className="text-gray-600">Customer Service Lead</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
