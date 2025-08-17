import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopChannels() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "Google",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.google,
    },
    {
      name: "X.com",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.x,
    },
    {
      name: "Github",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.github,
    },
    {
      name: "Vimeo",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.vimeo,
    },
    {
      name: "Facebook",
      visitors: 3456,
      revenues: 4220,
      sales: 3456,
      conversion: 2.59,
      logo: logos.facebook,
    },
  ];
}

export async function getUserTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      fullName: "Nurul Huda Binti Azlan",
      icNumber: "881123-10-5432",
      birthDate: "1988-11-23",
      phoneNumber: "013-1234567",
      email: "nurul.huda@example.com",
      password: "passSecure1!",
      role: "Staff",
    },
    {
      fullName: "Mohammed Khairul Bin Abdullah",
      icNumber: "920501-03-9876",
      birthDate: "1992-05-01",
      phoneNumber: "017-9876543",
      email: "khairul.m@example.com",
      password: "AdminPass#2025",
      role: "Admin",
    },
    {
      fullName: "Tan Mei Ling",
      icNumber: "790215-07-1122",
      birthDate: "1979-02-15",
      phoneNumber: "016-5551234",
      email: "mei.ling@example.com",
      password: "Supervisor@2024",
      role: "Supervisor",
    },
    {
      fullName: "Chong Wei Leong",
      icNumber: "950710-14-6789",
      birthDate: "1995-07-10",
      phoneNumber: "011-22334455",
      email: "weleong.c@example.com",
      password: "SuperAdminPass!",
      role: "Super Admin",
    },
    {
      fullName: "Saraswathy A/P Ramu",
      icNumber: "850920-05-3344",
      birthDate: "1985-09-20",
      phoneNumber: "012-7788990",
      email: "saraswathy.r@example.com",
      password: "UserPass789",
      role: "Staff",
    },
    {
      fullName: "Faizal Bin Ahmad",
      icNumber: "900305-04-2211",
      birthDate: "1990-03-05",
      phoneNumber: "019-1122334",
      email: "faizal.a@example.com",
      password: "faizal#Pass",
      role: "Staff",
    },
    {
      fullName: "Lee Choon Hau",
      icNumber: "821212-08-0099",
      birthDate: "1982-12-12",
      phoneNumber: "014-6789012",
      email: "choonhau.l@example.com",
      password: "LeeAdmin007",
      role: "Admin",
    },
    {
      fullName: "Noraini Binti Mohamad",
      icNumber: "930628-01-5678",
      birthDate: "1993-06-28",
      phoneNumber: "011-99887766",
      email: "noraini.m@example.com",
      password: "NorainiSup!",
      role: "Supervisor",
    },
    {
      fullName: "David Fernandez",
      icNumber: "870107-13-4321",
      birthDate: "1987-01-07",
      phoneNumber: "010-3344556",
      email: "david.f@example.com",
      password: "David@Pass",
      role: "Staff",
    },
    {
      fullName: "Zarina Binti Osman",
      icNumber: "910418-02-7654",
      birthDate: "1991-04-18",
      phoneNumber: "018-7654321",
      email: "zarina.o@example.com",
      password: "ZarinaSuper#",
      role: "Super Admin",
    },
  ];
}

export async function getTargetTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      icNumber: "900101-14-5678",
      fullName: "Ahmad bin Abdullah",
      age: 34,
      birthDate: "1990-01-01",
      currentAddress:
        "No. 10, Jalan Kenanga, Taman Impian, 40000 Shah Alam, Selangor",
    },
    {
      icNumber: "920315-01-1234",
      fullName: "Siti Nurhaliza binti Ismail",
      age: 32,
      birthDate: "1992-03-15",
      currentAddress: "Lot 22, Kampung Melati, 80000 Johor Bahru, Johor",
    },
    {
      icNumber: "880720-08-9012",
      fullName: "Chong Wei Liang",
      age: 36,
      birthDate: "1988-07-20",
      currentAddress: "Unit A-5-3, Pangsapuri Harmoni, 50450 Kuala Lumpur",
    },
    {
      icNumber: "951105-07-3456",
      fullName: "Priya a/p Krishnan",
      age: 29,
      birthDate: "1995-11-05",
      currentAddress:
        "No. 33, Lorong Anggerik, Taman Indah, 10450 George Town, Pulau Pinang",
    },
    {
      icNumber: "910922-10-7890",
      fullName: "Muhammad Ali bin Hassan",
      age: 33,
      birthDate: "1991-09-22",
      currentAddress:
        "Lot 15, Jalan Cempaka, Bandar Baru, 70300 Seremban, Negeri Sembilan",
    },
    {
      icNumber: "930410-03-2345",
      fullName: "Lim Mei Ling",
      age: 31,
      birthDate: "1993-04-10",
      currentAddress: "No. 8, Persiaran Bayu, Taman Permai, 30020 Ipoh, Perak",
    },
    {
      icNumber: "870228-04-6789",
      fullName: "Saravanan a/l Muthu",
      age: 37,
      birthDate: "1987-02-28",
      currentAddress: "Blok C, Flat Ria, Jalan Bukit, 25000 Kuantan, Pahang",
    },
    {
      icNumber: "940601-13-0123",
      fullName: "Nurul Huda binti Ahmad",
      age: 30,
      birthDate: "1994-06-01",
      currentAddress:
        "No. 2, Lorong Mawar, Taman Bahagia, 15050 Kota Bharu, Kelantan",
    },
    {
      icNumber: "891010-12-4567",
      fullName: "Tan Kim Seng",
      age: 35,
      birthDate: "1989-10-10",
      currentAddress: "Jalan Desa 1, Taman Desa, 93050 Kuching, Sarawak",
    },
    {
      icNumber: "961225-16-8901",
      fullName: "Farah Adila binti Razali",
      age: 28,
      birthDate: "1996-12-25",
      currentAddress: "Lot 7, Kampung Sejahtera, 88200 Kota Kinabalu, Sabah",
    },
  ];
}
