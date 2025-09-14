"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";

const lockers = [
	{ number: 10, pin: 1234 },
	{ number: 23, pin: 4321 },
	{ number: 31, pin: 1111 },
	{ number: 4, pin: 2222 },
	{ number: 57, pin: 3355 },
	{ number: 6, pin: 4646 },
	{ number: 7, pin: 5555 },
	{ number: 8, pin: 6789 },
	{ number: 19, pin: 2468 },
	{ number: 70, pin: 9876 },
];

export default function SmartSecurityPage() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-3xl mx-auto">
					<Card className="bg-card/50 border-border">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">
								Smart Security
							</CardTitle>
						</CardHeader>
						<CardContent>
							<table className="w-full border-collapse mt-4">
								<thead>
									<tr className="bg-muted">
										<th className="border px-4 py-2 text-left">
											Locker Number
										</th>
										<th className="border px-4 py-2 text-left">PIN</th>
									</tr>
								</thead>
								<tbody>
									{lockers.map((locker) => (
										<tr key={locker.number}>
											<td className="border px-4 py-2">
												{locker.number}
											</td>
											<td className="border px-4 py-2">
												{locker.pin}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
