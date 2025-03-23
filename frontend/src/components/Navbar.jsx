import React from 'react'
import GooeyNav from './GooeyNav/GooeyNav'


const items = [
  { label: "Customers", href: "/" },
  { label: "CreateCustomers", href: "/create" },
  { label: "Products", href: "/products" },
  { label: "CreateProducts", href: "/createprod" },
];

const Navbar = () => {
  return (
    <div style={{ height: '50px', position: 'relative' }} className='flex justify-between items-center bg-blue-800'>
  <h1 className='text-2xl text-white'>Ministore</h1>
  <GooeyNav
    items={items}
    animationTime={200}
    pCount={15}
    minDistance={20}
    maxDistance={42}
    maxRotate={75}
    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
    timeVariance={300}
  />
</div>
  )
}

export default Navbar