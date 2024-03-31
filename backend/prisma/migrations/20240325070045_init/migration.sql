-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "name" STRING NOT NULL,
    "passworid" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "price" INT4 NOT NULL,
    "QMTO" BOOL NOT NULL DEFAULT true,
    "details" JSONB,
    "description" STRING,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "foodId" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" STRING NOT NULL,
    "number" STRING NOT NULL,
    "status" STRING NOT NULL DEFAULT 'available',
    "QRCode" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "Chef" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "Chef_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Table_id_key" ON "Table"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Table_QRCode_key" ON "Table"("QRCode");

-- CreateIndex
CREATE UNIQUE INDEX "Chef_id_key" ON "Chef"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chef_email_key" ON "Chef"("email");
