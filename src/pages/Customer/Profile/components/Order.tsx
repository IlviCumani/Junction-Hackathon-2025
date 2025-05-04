type OrderOption = {
	ammount: number;
	option: {
	  name: string;
	  base_price: number;
	};
  };
  
  type OrderItem = {
	total_ammount: number;
	total_price: number;
	product: {
	  name: string;
	};
	order_options?: OrderOption[];
  };
  
  type Props = {
	order: {
	  id: number;
	  creation_date: string;
	  total_price: number;
	  order_items: OrderItem[];
	};
  };
  
  export default function Order({ order }: Props) {
	return (
	  <div className="border rounded-xl p-4 shadow-sm space-y-4">
		<div>
		  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
		  <p className="text-sm text-muted-foreground">Date: {order.creation_date}</p>
		  <p className="text-sm">Total: €{order.total_price}</p>
		</div>
  
		<div className="space-y-4">
		  {order.order_items.map((item, index) => (
			<div key={index} className="border-t pt-4">
			  <div className="flex items-start gap-4">
				<div>
				  <h4 className="font-medium">{item.product.name}</h4>
				  <p className="text-sm">
					Amount: {item.total_ammount} | Price: €{item.total_price.toFixed(2)}
				  </p>
  
				  {item.order_options && item.order_options.length > 0 && (
					<div className="mt-2">
					  <p className="text-sm font-medium">Options:</p>
					  <ul className="list-disc list-inside text-sm text-muted-foreground">
						{item.order_options.map((opt, i) => (
						  <li key={i}>
							{opt.option.name} (x{opt.ammount}) – €{opt.option.base_price.toFixed(2)}
						  </li>
						))}
					  </ul>
					</div>
				  )}
				</div>
			  </div>
			</div>
		  ))}
		</div>
	  </div>
	);
  }
  