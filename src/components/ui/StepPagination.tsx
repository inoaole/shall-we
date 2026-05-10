interface Props {
  current: number;
  total: number;
  /** Optional prefix label, e.g. "질문" → "질문 3/10" */
  label?: string;
}

export function StepPagination({ current, total, label = '질문' }: Props) {
  return (
    <span className="text-body-12 text-gray">
      {label} {current}/{total}
    </span>
  );
}
