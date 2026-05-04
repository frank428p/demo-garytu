'use client';

import { Card } from '@/components/ui/card';
import { H3 } from '@/components/ui/typography';

const CheckoutSuccessPage = () => {
  return (
    <>
      <div>
        <Card className="max-w-xl p-6 bg-card">
          <div className="flex flex-col items-center">
            <H3>Payment Successful</H3>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CheckoutSuccessPage;
