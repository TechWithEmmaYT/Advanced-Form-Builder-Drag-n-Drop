import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchFormStats } from "@/actions/form.action";
import { Skeleton } from "@/components/ui/skeleton";

const StatsCards = (props: {
  data: Awaited<ReturnType<typeof fetchFormStats>>;
  loading: boolean;
}) => {
  const { loading, data } = props;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Forms</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px]" />
            ) : (
              data?.totalForms || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            All forms created on your account
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Responses</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px]" />
            ) : (
              data?.totalResponses || 0
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Responses submitted for your forms
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Conversion Rate</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px]" />
            ) : (
              <>{data?.conversionRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of views that resulted in responses
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Engagement Rate</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px]" />
            ) : (
              <>{data?.engagementRate?.toFixed(1)}%</>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of forms that received responses
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
