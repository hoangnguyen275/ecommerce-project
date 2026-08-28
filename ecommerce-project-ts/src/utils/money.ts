export function formatMoney(ammountCents: number) {

  return (ammountCents >= 0 ? `$${(ammountCents / 100).toFixed(2)}` : `-$${(-ammountCents / 100).toFixed(2)}`);

}