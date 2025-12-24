import { getMyTeam } from "@/lib/actions/referral";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MyTeamPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-center mt-10">Please login</p>;
  }

  const team = await getMyTeam(user.id);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Team</h1>

      <Card>
        <CardHeader>
          <CardTitle>Direct Referrals ({team.length})</CardTitle>
        </CardHeader>

        <CardContent>
          {team.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have not referred anyone yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Username</th>
                    <th className="text-left py-2">Joined On</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((member: any) => (
                    <tr
                      key={member.referred.id}
                      className="border-b last:border-0"
                    >
                      <td className="py-2 font-medium">
                        {member.referred.username}
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {new Date(member.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
