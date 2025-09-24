import { MapPin, Phone } from "lucide-react";

type ContactInformationProps = {
	address: string;
	contact: string;
};

export function ContactInformation({
	address,
	contact,
}: ContactInformationProps) {
	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Informações de Contato
			</h3>
			<div className="space-y-4">
				<div className="flex items-center space-x-3">
					<MapPin className="w-5 h-5 text-gray-400" />
					<span className="text-gray-700">{address}</span>
				</div>
				<div className="flex items-center space-x-3">
					<Phone className="w-5 h-5 text-gray-400" />
					<span className="text-gray-700">{contact}</span>
				</div>
			</div>
		</div>
	);
}
