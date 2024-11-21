'use client'

import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import CartItems from './cart-items'
import DeliveryOptions from './delivery-options'
import Stepper from './stepper'
import PaymentMethods from './payment-methods'
import OrderSummary from './order-summary'
import OrderConfirmation from './order-confirmation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import AppBreadcrumb from '../navigation/app-breadcrumb'

const steps = ['Cart', 'Delivery', 'Payment', 'Confirmation']

const cartItems = [
  {
    id: 1,
    name: 'Gallo Espaguettini al huevo',
    price: 190.0,
    quantity: 2,
    image: '/natilla.webp',
  },
  {
    id: 2,
    name: 'Vodka Borjska Bianca',
    price: 1600.0,
    quantity: 1,
    image: '/natilla.webp',
  },
]

const deliveryOptions = [
  {
    id: 'standard',
    name: 'Entrega estándar',
    price: 50.0,
    duration: '3-5 business days',
  },
  {
    id: 'express',
    name: 'Entrega express',
    price: 100.0,
    duration: '1-2 business days',
  },
]

const paymentMethods = [
  { id: 'credit-card', name: 'Tarjeta de Crédito' },
  { id: 'paypal', name: 'PayPal' },
  { id: 'bank-transfer', name: 'Transfermovil' },
]

export default function CheckoutProcess() {
  const [currentStep, setCurrentStep] = useState(0)
  const [items, setItems] = useState(cartItems)
  const [selectedDelivery, setSelectedDelivery] = useState(
    deliveryOptions[0].id
  )
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id)

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const deliveryFee =
    deliveryOptions.find((option) => option.id === selectedDelivery)?.price || 0
  const total = subtotal + deliveryFee

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CartItems items={items} updateQuantity={updateQuantity} />
      case 1:
        return (
          <DeliveryOptions
            onSelect={setSelectedDelivery}
            options={deliveryOptions}
            selectedDelivery={selectedDelivery}
          />
        )
      case 2:
        return (
          <PaymentMethods
            methods={paymentMethods}
            onChange={setSelectedPayment}
            selected={selectedPayment}
          />
        )
      case 3:
        return <OrderConfirmation />
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <div className='container p-4'>
        <AppBreadcrumb
          items={[
            { name: 'Checkout', href: '/checkout', icon: <ShoppingCart /> },
          ]}
        />
        <Stepper currentStep={currentStep} steps={steps} goToStep={goToStep} />
      </div>

      {/* Main Content */}
      <div className='flex-grow container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-2/3'>
            <Card className='mb-8'>
              <CardContent className='p-6'>
                {/* <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className='min-h-[300px]' // Predefined minimum height
                  > */}
                {renderStepContent()}
                {/* </motion.div>
                </AnimatePresence> */}
              </CardContent>
            </Card>
          </div>

          <OrderSummary
            currentStep={currentStep}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            goBack={goBack}
            goForward={goForward}
            steps={steps}
          />
        </div>
      </div>
    </div>
  )
}
