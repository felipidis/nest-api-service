-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "duration" TIME NOT NULL,
    "commission" DECIMAL(3,2) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "clientId" TEXT NOT NULL,
    "professionalId" TEXT,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttendanceToJob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceToJob_AB_unique" ON "_AttendanceToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceToJob_B_index" ON "_AttendanceToJob"("B");

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToJob" ADD CONSTRAINT "_AttendanceToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "attendances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToJob" ADD CONSTRAINT "_AttendanceToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
