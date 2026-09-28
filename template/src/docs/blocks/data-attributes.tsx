import type { ReactNode } from "react"

type DataAttribute = {
  attribute: string
  element: ReactNode
  when: ReactNode
}

/**
 * The attributes a part sets on its own markup, so consumers can style it by
 * slot or state without reaching into its class names.
 */
function DataAttributes({ rows }: { rows: DataAttribute[] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-lg border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border text-foreground">
            <th className="py-2.5 pr-4 font-medium">Attribute</th>
            <th className="py-2.5 pr-4 font-medium">Element</th>
            <th className="py-2.5 font-medium">Present when</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.attribute}
              className="border-b border-border align-top last:border-b-0"
            >
              <td className="py-3 pr-4">
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.8125rem] whitespace-nowrap text-foreground">
                  {row.attribute}
                </code>
              </td>
              <td className="py-3 pr-4 leading-6 text-muted-foreground">
                {row.element}
              </td>
              <td className="py-3 leading-6 text-muted-foreground">
                {row.when}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { DataAttributes }
