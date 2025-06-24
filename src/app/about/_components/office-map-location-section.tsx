export function OfficeMapLocationSection(props: { src: string }) {
  return (
    <div className="h-[31.25rem] xl:h-[26rem]">
      <iframe
        className="h-full"
        src={props.src}
        width="100%"
        height="500"
        loading="lazy"
        style={{ border: 0 }}
        aria-hidden="false"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
