-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "env" TEXT NOT NULL DEFAULT 'dev',
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedbacks" INTEGER NOT NULL DEFAULT 0,
    "paymentIntentId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'paid',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_priceId_key" ON "Product"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentIntentId_key" ON "Payment"("paymentIntentId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
