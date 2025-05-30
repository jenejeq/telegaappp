import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function BookingDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Эмуляция получения данных с бэка
    const data = [
      {
        name: "Иван Иванов",
        phone: "+79998887766",
        trainer: "Алексей",
        session: "Индивидуальная тренировка",
        price: 1500,
      },
      {
        name: "Анна Петрова",
        phone: "+79881234567",
        trainer: "Ирина",
        session: "Групповая тренировка",
        price: 600,
      },
    ];
    setBookings(data);
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(filter.toLowerCase()) ||
      b.trainer.toLowerCase().includes(filter.toLowerCase())
  );

  const totalIncome = filteredBookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Учёт записей и доходов</h1>
      <div className="mb-4">
        <Input
          placeholder="Поиск по имени или тренеру..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <Card className="shadow-xl">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Клиент</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Тренер</TableHead>
                <TableHead>Тип тренировки</TableHead>
                <TableHead>Цена (₽)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((b, i) => (
                <TableRow key={i}>
                  <TableCell>{b.name}</TableCell>
                  <TableCell>{b.phone}</TableCell>
                  <TableCell>{b.trainer}</TableCell>
                  <TableCell>{b.session}</TableCell>
                  <TableCell>{b.price}</TableCell>
                </TableRow>
              ))}
              {filteredBookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Ничего не найдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="text-right mt-4 text-lg font-semibold">
        Общий доход: ₽{totalIncome}
      </div>
    </div>
  );
}
